export const addBoard
 = (title: string) => {
   console.log(`in addBoard title is ${title}`);
  return {
    type: "add_board",
    payload: {title: title},
  }
}