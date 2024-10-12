import { Button } from "../button";

export const SingleInput = ({ updateValue, label = null, size = 10 }: { updateValue: (newName: string) => void, label?: React.ReactNode, size?: number }) => {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newName = formData.get('name') as string;
        updateValue(newName);
      }}> 
        {label}
        <input type='text' name='name' size={size} />
        <Button buttonStyle='primarySmallOnDark' btnType='submit'>Save</Button>
      </form>
    )
  }