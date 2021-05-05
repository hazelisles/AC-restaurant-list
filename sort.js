function toSort(string) {
  const type = string
  switch (type) {
    case 'a':
      return {name: 'asc'}
    case 'z':
      return {name: 'desc'}
    case 'category':
      return {category: 'asc'}
    case 'ra':
      return {rating: 'desc'}
    case 'rz':
      return {rating: 'asc'}
    case 'ta':
      return {_id: 'desc'}
    case 'tz':
      return {_id: 'asc'}            
  }
}

module.exports = toSort