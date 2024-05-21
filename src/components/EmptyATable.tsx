import { ADMINTABLETEXTH } from "../theme/colors";

type EmptyATableProps = {
    table: string
}

export default function EmptyATable({ table }: EmptyATableProps){
    return(
        <div className="flex flex-col items-center justify-center">
            <img className="w-20" alt="emptytable" src="../emptytable.png"/>
            <div className="text-sm mt-2 font-semibold" style={{color:ADMINTABLETEXTH}}>
                {
                    table==='students'?
                        'No registered students yet'
                    :   table==='drivers'?
                            'No registered drivers yet'
                        :   'No recorded emission data yet'
                }
            </div>
        </div>
    );
}