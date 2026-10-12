import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {FieldGroup} from '@/components/ui/field';

import {useLogin} from '@/api/auth/api';
import InputField from '@/components/form/input-field';
import Cookies from 'universal-cookie';
import {TOKEN_KEY} from '@/lib/constant';
import {useNavigate} from 'react-router';

const loginSchema = z.object({
  email: z.string().min(1, 'البريد الإلكتروني مطلوب').email('أدخل بريدًا إلكترونيًا صحيحًا'),
  password: z.string().min(1, 'كلمة المرور مطلوبة')
});

type TLoginForm = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {mutate: login, isPending} = useLogin();
  const navigate = useNavigate();
  const {control, handleSubmit} = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: TLoginForm) => {
    login(data, {
      onSuccess: ({data}) => {
        const accessToken = data.token.accessToken;
        const cookie = new Cookies();
        cookie.set(TOKEN_KEY, accessToken);
        navigate('/');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} dir='rtl' className='flex flex-col gap-6'>
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>تسجيل الدخول</h1>
          <p className='text-sm text-balance text-muted-foreground'>سجّل الدخول إلى حسابك في جمعية هندسة الحاسوب</p>
        </div>

        <InputField
          control={control}
          register={{name: 'email'}}
          label='البريد الإلكتروني'
          placeholder='أدخل بريدك الإلكتروني'
          props={{
            id: 'email',
            type: 'email',
            autoComplete: 'email'
          }}
        />

        <InputField
          control={control}
          register={{name: 'password'}}
          label='كلمة المرور'
          placeholder='أدخل كلمة المرور'
          props={{
            id: 'password',
            type: 'password',
            autoComplete: 'current-password'
          }}
        />

        <Button type='submit' disabled={isPending}>
          {isPending ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
        </Button>
      </FieldGroup>
    </form>
  );
}
