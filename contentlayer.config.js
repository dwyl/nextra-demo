import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

const computedFieldsPage = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
}

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `**/*.mdx`,
  computedFieldsPage,
}))

export const MetaJson = defineDocumentType(() => ({
  name: 'MetaJson',
  filePathPattern: `**/_meta.json`,
}))

export default makeSource({
  contentDirPath: 'src/pages',
  documentTypes: [Page],
  onUnknownDocuments: 'skip-ignore'

})
