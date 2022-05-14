export const addColumn
 = (title: string) => {
   console.log(`in addColumn title is ${title}`);
  return {
    type: "add_column",
    payload: {title: title},
  }
}