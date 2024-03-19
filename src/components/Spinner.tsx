type SpinnerProps = {
    loading: boolean,
    size: string,
    borderColor: string,
    borderTopColor: string,
}

export default function LoadingSpinner(props: SpinnerProps) {
    return (
        <div className="spinner-container" style={{display:props.loading?'flex':'none'}}>
            <div className="animate-spin border-4 border-[#f3f3f3] border-t-[#383636] rounded-full" style={{width:props.size, height:props.size, borderColor:props.borderColor, borderTopColor:props.borderTopColor}}>
            </div>
        </div>
    );
}