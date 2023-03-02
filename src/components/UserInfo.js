export default class UserInfo {
  constructor({name, profession, avatar}) {
    this.name = name;
    this.profession = profession;
    this.avatar = avatar;
  }

  getUserInfo() {
    const profileData = {
      name: this.name.innerText,
      about: this.profession.innerText,
    }
    return profileData;
  }

  setUserAvatar(data) {
    this.avatar.src = data.avatar
  }

  setUserInfo(profileData) {
    this.name.textContent = profileData.name;
    this.profession.textContent = profileData.about;
    this.avatar.src = profileData.avatar
  }
}