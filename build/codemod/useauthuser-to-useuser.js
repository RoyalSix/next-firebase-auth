import renameImport from"./util/renameImport";const originalAPIName="useAuthUser",newAPIName="useUser";export default function transformer(e,r,t){return renameImport({file:e,api:r,options:t},{originalAPIName:"useAuthUser",newAPIName:"useUser"})}