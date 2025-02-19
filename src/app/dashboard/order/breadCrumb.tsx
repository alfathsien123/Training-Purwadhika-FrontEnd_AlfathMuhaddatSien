import { BiFoodMenu } from "react-icons/bi";

const BreadCrumb = () => {
  return (
<div className="breadcrumbs text-gray-500">
  <ul>
    <li>
    <BiFoodMenu className="mr-5"/>
      <a>
        Order
      </a>
    </li>
  </ul>
</div>
  )
}

export default BreadCrumb