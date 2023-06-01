

export const isEmail = (email) => {
    const emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
    return emailRegex.test(email);
}

export const checkPassword = (password) => {
    const passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")
    return passwordRegex.test(password);
}

export const getUserName = () => {
    let userDetails = localStorage.getItem('user_details');
    if (userDetails){
      userDetails = JSON.parse(userDetails);
      if (userDetails){
        return `${userDetails?.first_name} ${userDetails?.last_name ? userDetails?.last_name : ""} `
      }
      return "Guest"
    }
    return "Guest"
  }