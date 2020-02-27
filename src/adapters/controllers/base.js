export default function makeBaseController({ adaptHttpResponse }) {
  return Object.freeze({
    insertItem,
    getItemById,
    updateItem,
    removeItem,
  });

  async function insertItem({ addItemUseCase, info }) {
    const result = await addItemUseCase({ info });
    return {
      headers: {
        'Last-Modified': result.modifiedOn,
      },
      ...adaptHttpResponse({
        result,
        statusCode: 201,
      })
    }
  }

  async function getItemById({ getItemUseCase, id }) {
    const result = await getItemUseCase({ id });

    return adaptHttpResponse({
      result,
      statusCode: 200,
    })
  }

  async function updateItem({ updateItemUseCase, id, changes }) {
    const result = await updateItemUseCase({ id, ...changes });

    return adaptHttpResponse({
      result,
      statusCode: 200,
    })
  }

  async function removeItem({ removeItemUseCase, id }) {
    const result = await removeItemUseCase({ id });

    return adaptHttpResponse({
      result,
      statusCode: 200,
    })
  }
}