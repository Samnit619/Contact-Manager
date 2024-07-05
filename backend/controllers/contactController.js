const asyncHandler = require("express-async-handler");
const Contact = require("../Models/contactModel");
//@desc get New contact
//@route get / api/ contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.json(contacts);
});

//@desc create new contact
//@route post / api/ contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All field are mandatory! ");
  }
  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc get contact with id
//@route get / api/ contacts
//@access private

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
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Can't find the contact with the given id.");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You don't have the permission to access this contact");
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
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  console.log("Delete request received for ID:", req.params.id);

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Can't find the contact with the given id.");
    }

    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("You don't have the permission to access this contact");
    }

    await contact.deleteOne();
    console.log("Contact deleted successfully:", contact);

    res.status(200).json({ message: "Contact deleted successfully", contact });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getContacts,
  getContact,
  updateContact,
  createContact,
  deleteContact,
};
