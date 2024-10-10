import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

// This function computes the fields to add to the `Page` document type
const computedFieldsPage = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
}

// Define the document type for a `Page` (an `.mdx` file).
export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `**/*.mdx`,
  computedFieldsPage,
}))

// Define the document type for each `_meta.ts` file
export const MetaJson = defineDocumentType(() => ({
  name: 'MetaJson',
  filePathPattern: `**/_meta.ts`,
}))

export default makeSource({
  contentDirPath: 'src/pages',
  documentTypes: [Page],
  onUnknownDocuments: 'skip-ignore'

})
