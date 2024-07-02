# nextra-theme-docs

> [!NOTE]
>
> If you want to customize this theme,
> you should only need to change the `src/components` components.

This `theme` folder is taken directly from Nextra's [`theme-docs`](https://github.com/shuding/nextra/tree/main/packages/nextra-theme-docs) repo.
All credits go to them.

In addition to this,
we've also added some components from the official [`nextra`](https://github.com/shuding/nextra/tree/main/packages/nextra) repository
that are needed for the `theme-docs` theme to work properly, namely:

- `src/nextra_components` is copied from `nextra`'s [`components` folder](https://github.com/shuding/nextra/tree/main/packages/nextra/src/components).
- `src/nextra_icons` is copied from `nextra`'s [`icons` folder](https://github.com/shuding/nextra/tree/main/packages/nextra/src/icons).
- `css/nextra_styles` is copied from `nextra`'s [`styles` folder](https://github.com/shuding/nextra/tree/main/packages/nextra/styles).


### A note about the `src/constants.tsx` file

This `theme` directory is an exact copy
(with the aforementioned changes) of the [`theme-docs` repository](https://github.com/shuding/nextra/tree/main/packages/nextra-theme-docs).
However, simply copying and pasting the code was not enough to use this custom theme.

An additional change that was made was moving the code from [`src/constants.tsx` file](https://github.com/shuding/nextra/blob/main/packages/nextra-theme-docs/src/constants.tsx)
to `src/contexts/config.tsx`.
This was because the `constants.tsx` file was being loaded after `config.tsx`,
which in turn needed `constants.tsx`,
thus creating a `⨯ ReferenceError: Cannot access 'DEFAULT_THEME' before initialization` error.

The copied section is made explicit inside [`src/contexts/config.tsx`](./src/contexts/config.tsx).