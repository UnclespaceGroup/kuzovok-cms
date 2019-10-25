const users = [{
  login: 'login', passwd: 'pass'
}]

const UserModel = {
  auth: (login, passwd) => {
    const cur = users.find(item => item.login === login)
    if (!cur) return { status: false, message: 'Не найден пользователь' }
    if (cur.passwd !== passwd) return { status: false, message: 'Не верный пароль' }
    return { status: true, login }
  }
}

module.exports = {
  UserModel
}