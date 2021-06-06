import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const typesArray = loadFilesSync('**\\*.graphql');

export const typeDefs =  mergeTypeDefs(typesArray);