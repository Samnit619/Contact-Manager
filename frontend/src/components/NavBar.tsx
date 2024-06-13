
const NavBar = () => {
  return (
    <div className="flex justify-between items-center px-5 py-5">
        <div className=" w-36">Logo</div>
        <div className=" flex gap-4">
            <div>Contacts</div>
            <div>Favorites</div>
            <div>Tags</div>
        </div>
        <div className=" flex gap-4">
            <div>Settings</div>
            <img src="" alt="No Img" />
        </div>
    </div>
  )
}

export default NavBar;