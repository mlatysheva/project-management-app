export const addColumn
 = (title: string) => {
  return {
    type: "add_column",
    payload: {title: title},
  }
}