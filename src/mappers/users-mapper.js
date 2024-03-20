const mapRequestBodyToUserRequest = ({ user_id, user_name, api_key }) => ({
  userId: typeof user_id !== 'undefined' ? user_id : null,
  userName: typeof user_name !== 'undefined' ? user_name : null,
  apiKey: typeof api_key !== 'undefined' ? api_key : null,
});

module.exports = {
  mapRequestBodyToUserRequest,
};
