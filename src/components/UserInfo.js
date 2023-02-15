export default class UserInfo {
  constructor({name, description}) {
    this.name = name;
    this.description = description;
  }

  getUserInfo() {
    const profileData = {
      name: this.name.innerText,
      description: this.description.innerText,
    }
    return profileData;
  }

  setUserInfo(profileData) {
    this.name.textContent = profileData.name;
    this.description.textContent = profileData.description;
  }
}