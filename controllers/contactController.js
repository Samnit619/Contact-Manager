//@desc get New contact
//@route get / api/ contacts
//@access public

const getContacts = (req, res) => {
  res.json({ message: "get all contacts" });
};

//@desc create new contact
//@route post / api/ contacts
//@access public

const createContact = (req, res) => {
  res.json({ message: "Create Contact" });
};

//@desc get contact with id
//@route get / api/ contacts
//@access public

const getContact = (req, res) => {
  res.json({ message: `Get contact for ${req.params.id}` });
};

//@desc update contact with id
//@route put / api/ contacts
//@access public

const updateContact = (req, res) => {
  res.json({ message: `Update contact for ${req.params.id}` });
};

//@desc delete contact with id
//@route delete / api/ contacts
//@access public

const deleteContact = (req, res) => {
  res.json({ message: `Delete contact for ${req.params.id}` });
};

module.exports = {getContacts,
  getContact,
  updateContact,
  createContact,
  deleteContact};
