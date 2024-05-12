export const Textarea = ({onInput , value}) => {
    return (
        <textarea onInput={onInput} value={value} className='text-area' placeholder="Copy the phrase right here..."></textarea>
    )
}