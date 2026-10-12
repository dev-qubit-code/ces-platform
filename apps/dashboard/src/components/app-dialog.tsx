import { Button } from '@/components/ui/button';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {cn} from '@/lib/utils';
import { useAppDialog } from '@/store/dialog-store';

export function AppDialog() {
  const {dialog, onClose} = useAppDialog();

  return (
    <Dialog defaultOpen={false} open={!!dialog} onOpenChange={() => onClose()}>
      <DialogContent dir='rtl' className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>{dialog?.title}</DialogTitle>

          {dialog?.description && <DialogDescription>{dialog.description}</DialogDescription>}
        </DialogHeader>

        <ScrollArea className='max-h-[calc(100vh-260px)]'>
          <div className={cn('px-1', dialog?.className)}>{dialog?.content}</div>
        </ScrollArea>

        {(dialog?.primaryAction || dialog?.secondaryAction) && (
          <DialogFooter>
            {dialog?.secondaryAction && (
              <DialogClose
                render={
                  <Button
                    type='button'
                    variant='outline'
                    disabled={dialog.secondaryAction.disabled}
                    className={cn(dialog.secondaryAction.className)}
                    onClick={() => {
                      dialog.secondaryAction?.onClick?.();
                    }}
                  >
                    {dialog.secondaryAction.text}
                  </Button>
                }
              />
            )}

            {dialog?.primaryAction && (
              <Button
                type='submit'
                disabled={dialog.primaryAction.disabled}
                form={dialog.primaryAction.formId}
                className={cn(dialog.primaryAction.className)}
                onClick={() => {
                  dialog.primaryAction?.onClick?.();
                }}
              >
                {dialog.primaryAction.text}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
