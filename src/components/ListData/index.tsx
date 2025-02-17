import {PropsListData} from './type';

function ListData({fruit, price}: PropsListData) {
    return (
        <li>{fruit} = {price}</li>
    );
}

export default ListData;