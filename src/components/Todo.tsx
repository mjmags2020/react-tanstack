// import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries";

export default function Todo() {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);
  //   const isFetching = useIsFetching();

  //   if (todosIdsQuery.isPending) {
  //     return <span>Loading...</span>;
  //   }
  //   if (todosIdsQuery.isError) {
  //     return <span>Error...</span>;
  //   }

  return (
    <div>
      {/* <p>Query function status: {todosIdsQuery.fetchStatus}</p>
      <p>Query data status: {todosIdsQuery.status}</p>
      <p>Global isFetching: {isFetching}</p> */}
      {todosIdsQuery?.data?.map((id) => (
        <p key={id}>id: {id}</p>
      ))}
      {todosQueries?.map(({ data }) => (
        <li key={data?.id}>
          <div>ID: {data?.id}</div>
          <span>
            <strong>Title: {data?.title}</strong>
            <strong>Description: {data?.description}</strong>
          </span>
        </li>
      ))}
    </div>
  );
}
