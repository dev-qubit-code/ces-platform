import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNoteById} from '@/api/notes/api';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
type ViewMemoirFormValues = {
  name: string;
};
const ViewMemoirForm = ({id}: {id: string}) => {
  const {data: note, isLoading} = useNoteById(id, {
    select: data => data.data
  });
  const form = useForm<ViewMemoirFormValues>({
    defaultValues: {
      name: ''
    }
  });
  useEffect(() => {
    if (!isLoading && note) {
      form.reset({
        name: note.name
      });
    }
  }, [form, isLoading, note]);
  return (
    <form>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الملزمة' props={{readOnly: true}} control={form.control} register={form.register('name')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
export default ViewMemoirForm;
