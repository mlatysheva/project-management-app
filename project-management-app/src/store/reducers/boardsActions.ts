export const addBoard
 = (title: string) => {
  return {
    type: "add_board",
    payload: title,
  }
}