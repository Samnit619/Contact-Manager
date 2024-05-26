const asyncHandler = require("express-async-handler");
const Contact = require("../Models/contactModel");
//@desc get New contact
//@route get / api/ contacts
//@access public

const getContacts = asyncHandler( async (req, res) => {
  res.json({ message: "get all contacts" });
});

//@desc create new contact
//@route post / api/ contacts
//@access public

const createContact = asyncHandler( async (req, res) => {
    console.log("The request body is: ", req.body);
    const {name, email, phone} =  req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All field are mandatory! ")
    }
  res.json({ message: "Create Contact" });
});

//@desc get contact with id
//@route get / api/ contacts
//@access public

const getContact = asyncHandler( async (req, res) => {
  res.json({ message: `Get contact for ${req.params.id}` });
});

//@desc update contact with id
//@route put / api/ contacts
//@access public

const updateContact = asyncHandler( async (req, res) => {
  res.json({ message: `Update contact for ${req.params.id}` });
});

//@desc delete contact with id
//@route delete / api/ contacts
//@access public 

const deleteContact = asyncHandler(async (req, res) => {
  res.json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = {getContacts,
  getContact,
  updateContact,
  createContact,
  deleteContact};
