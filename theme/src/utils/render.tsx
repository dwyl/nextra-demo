import { SessionContextValue } from "next-auth/react";
import type { FC, ReactNode } from "react";
import { ExtendedUser } from "../../../src/types";
import { ExtendedItem, ExtendedPageItem, ExtendedMenuItem } from "../types";

export function renderComponent<T>(ComponentOrNode: FC<T> | ReactNode, props?: T) {
  if (!ComponentOrNode) return null;
  if (typeof ComponentOrNode !== "function") return ComponentOrNode;
  // @ts-expect-error TS2322: Type '{}' is not assignable to type 'T'
  return <ComponentOrNode {...props} />;
}

export function renderString<T>(
  stringOrFunction?: string | ((props: T) => string),
  // @ts-expect-error TS2322: Type '{}' is not assignable to type 'T'.
  props: T = {}
): string {
  const result = typeof stringOrFunction === "function" ? stringOrFunction(props) : stringOrFunction;
  return result || "";
}

/**
 * This functions tells if the user can see a given `navbar` or `sidebar` link item
 * according to its role.
 * @param session session from the user.
 * @param item item (can either be a page item, menu item or normal item)
 * @returns true if the link can be shown to the user. False if the user doesn't have authorization to see the link.
 */
export function shouldLinkBeRenderedAccordingToUserRole(
  session: SessionContextValue<boolean>,
  item: ExtendedItem | ExtendedPageItem | ExtendedMenuItem
) {
  const { data, status: session_status } = session;
  const user = data?.user as ExtendedUser;

  // Wait until the session is fetched (be it empty or authenticated)
  if (session_status === "loading") return false;

  // If it's a public user but the link is marked as private, hide it
  if (session_status === "unauthenticated") {
    if (item.private) return false;
  }

  // If the user is authenticated
  // and the page menu is protected or the role of the user is not present in the array, we block it
  if (session_status === "authenticated" && user) {
    if (item.private?.private) {
      const neededRoles = item.private.roles || [];
      const userRole = user.role;
      if (!userRole || !neededRoles.includes(userRole)) {
        return false;
      }
    }
  }

  return true;
}
