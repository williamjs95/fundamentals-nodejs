// ['search=Diego', page=1]

// ['search', 'Diego']
// ['page', '1']

export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=');

    queryParams[key] = value;

    return queryParams;
  }, {})
}