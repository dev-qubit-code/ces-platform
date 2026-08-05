import {Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle} from '@/components/ui/sheet';
import {cn} from '@/lib/utils';
import {useAppSheet} from '@/store/sheet-store';
import {Button} from './ui/button';
import {ScrollArea} from './ui/scroll-area';
export function AppSheet() {
  const {sheet, onClose} = useAppSheet();

  return (
    <Sheet defaultOpen={false} open={!!sheet} onOpenChange={() => onClose()}>
      <SheetContent className={''} side='right' dir='rtl'>
        <SheetHeader>
          <SheetTitle className={'font-bold text-xl'}>{sheet?.title}</SheetTitle>
          <SheetDescription>{sheet?.description}</SheetDescription>
        </SheetHeader>
        <ScrollArea className={'max-h-[calc(100vh-220px)]'}>
          <div className={cn('px-4', sheet?.className)}>{sheet?.content}</div>
        </ScrollArea>

        <SheetFooter>
          {sheet?.primaryAction && (
            <Button
              type='submit'
              form={sheet.primaryAction.formId}
              className={cn(sheet.primaryAction.className)}
              onClick={() => {
                sheet.primaryAction?.onClick?.();
              }}
            >
              {sheet.primaryAction.text}
            </Button>
          )}
          {sheet?.secondaryAction && (
            <SheetClose
              render={
                <Button
                  className={cn(sheet.secondaryAction?.className)}
                  onClick={() => {
                    sheet.secondaryAction?.onClick?.();
                  }}
                  variant='outline'
                >
                  {sheet.secondaryAction?.text}
                </Button>
              }
            />
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
