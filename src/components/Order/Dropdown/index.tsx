export const Dropdown = () => {
  return (
    <div>
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1 bg-green-600 text-white rounded-full">Creat Order</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>Purchase Order</a></li>
                <li><a>Sales Order</a></li>
            </ul>
        </div>
    </div>
  )
}
