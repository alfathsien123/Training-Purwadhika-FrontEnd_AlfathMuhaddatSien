import BreadCrumb from "./breadCrumb"
import SearchInput from "@/components/Order/SearchInput"
import { Dropdown } from "@/components/Order/Dropdown"
import { Table } from "@/components/Order/Table"

const Order = () => {
  return (
    <div className=" ">
        <div className="pl-5 pr-5 mt-8 mb-8 w-full">
          <div>
            <BreadCrumb />
          </div>
          <div className="mt-10 flex flex-row items-center justify-between">
            <div>
              <SearchInput/>
            </div>
            <div>
              <Dropdown />
            </div>
          </div>
        </div>

        <div className="p-5">
          <Table />
        </div>
    </div>
  )
}

export default Order