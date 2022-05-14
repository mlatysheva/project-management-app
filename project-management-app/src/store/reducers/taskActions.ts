export const addTask
 = (title: string) => {
   console.log(`in addTask title is ${title}`);
  return {
    type: "add_task",
    payload: {title: title},
  }
}