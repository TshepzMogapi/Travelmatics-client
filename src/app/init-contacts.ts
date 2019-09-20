export class Init {
  load() {
    if (
      localStorage.getItem("contacts") === null ||
      localStorage.getItem("contacts") == undefined
    ) {
      console.log("No Contacts Found... Creating...");
      let contacts = [
        {
          id: 1,
          firstName: "Tshepiso",
          lastName: "Mogapi",
          emailAddress: "tshepzmogapi@email.com",
          contactType: "Family",
          contactDetails: [
            {
              emailAddress: "tshepzmogapi@email.com",
              phoneNumber: "0786781234",
              websiteUrl: "https://tshepzmogapi.com"
            }
          ]
        }
      ];

      localStorage.setItem("contacts", JSON.stringify(contacts));
      return;
    } else {
      console.log("Found Contacts...");
    }
  }
}
