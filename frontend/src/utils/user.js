const user = {
  getUser: () => JSON.parse(localStorage.getItem('user')),
  setUser: (data) => localStorage.setItem('user', JSON.stringify(data))
}

export default user;