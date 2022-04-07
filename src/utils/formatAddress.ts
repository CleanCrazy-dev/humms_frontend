export const getDisplayAddress = (account?: string) => {
  return `${account?.substring(0, 6)}...${account?.substr(account?.length - 4)}`;
}