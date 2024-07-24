import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, ''),
  },
}

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `**/*.mdx`,
  computedFields,
}))

export const MetaJson = defineDocumentType(() => ({
  name: 'MetaJson',
  filePathPattern: `**/_meta.json`,
}))
export default makeSource({
  contentDirPath: 'src/pages',
  documentTypes: [Page, MetaJson],
})
