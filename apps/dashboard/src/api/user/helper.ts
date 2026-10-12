export const userStatusToastMapper: Record<'true' | 'false', {title: string; description: string}> = {
  true: {
    title: 'تم تفعيل المستخدم',
    description: 'تم تفعيل المستخدم بنجاح.'
  },
  false: {
    title: 'تم تعطيل المستخدم',
    description: 'تم تعطيل المستخدم بنجاح.'
  }
};
