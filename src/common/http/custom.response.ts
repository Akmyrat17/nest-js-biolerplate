type Props = {
  action: 'create' | 'update' | 'delete' | 'success';
  data: any;
};

export const responseMessage = ({ action, data }: Props) => {
  switch (action) {
    case 'create':
      return {
        statusCode: 201,
        title: 'create',
        message: 'Successfully created',
        data,
      };
    case 'update':
      return {
        statusCode: 200,
        title: 'update',
        message: 'Successfully updated',
        data,
      };
    case 'delete':
      return {
        statusCode: 200,
        title: 'delete',
        message: 'Successfully deleted!',
        data,
      };
    case 'success':
      return {
        statusCode: 200,
        title: 'success',
        message: 'Operation success',
        data,
      };
  }
};
