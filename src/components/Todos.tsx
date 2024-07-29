// import { useIsFetching } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/todo";

export default function Todos() {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    console.log(data);
    createTodoMutation.mutate(data);
  };
  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      console.log(data);
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };
  //   const isFetching = useIsFetching();

  //   if (todosIdsQuery.isPending) {
  //     return <span>Loading...</span>;
  //   }
  //   if (todosIdsQuery.isError) {
  //     return <span>Error...</span>;
  //   }
  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
    console.log("success");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo:</h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create"}
        />
      </form>

      {/* <p>Query function status: {todosIdsQuery.fetchStatus}</p>
      <p>Query data status: {todosIdsQuery.status}</p>
      <p>Global isFetching: {isFetching}</p> */}
      {/* {todosIdsQuery?.data?.map((id) => (
        <p key={id}>id: {id}</p>
      ))} */}
      {todosQueries?.map(({ data }) => (
        <li key={data?.id}>
          <div>ID: {data?.id}</div>
          <span>
            <strong>Title: {data?.title}</strong> <br />
            <strong>Description: {data?.description}</strong>
          </span>
          <div>
            <button
              onClick={() => handleMarkAsDoneSubmit(data)}
              disabled={data?.checked}
            >
              {data?.checked ? "Done" : "Mark as done"}
            </button>
            {data && data.id && (
              <button onClick={() => handleDeleteTodo(data.id!)}>Delete</button>
            )}
          </div>
        </li>
      ))}
    </div>
  );
}
