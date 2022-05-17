export const addBoard2
 = (title: string) => {
  return {
    type: "add_board",
    payload: {title: title},
  }
}