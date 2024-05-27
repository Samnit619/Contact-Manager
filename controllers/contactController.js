const asyncHandler = require("express-async-handler");
const Contact = require("../Models/contactModel");
//@desc get New contact
//@route get / api/ contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

//@desc create new contact
//@route post / api/ contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All field are mandatory! ");
  }
  const contact = Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc get contact with id
//@route get / api/ contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Can't find the contact with the given id.");
  }

  res.json(contact);
});

//@desc update contact with id
//@route put / api/ contacts
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Can't find the contact with the given id.");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updateContact);
});

//@desc delete contact with id
//@route delete / api/ contacts
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Can't find the contact with the given id.");
  }

  await contact.remove();
  res.status(200).json({ message: "Contact deleted successfully", contact });
});

module.exports = {
  getContacts,
  getContact,
  updateContact,
  createContact,
  deleteContact,
};
