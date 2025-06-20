import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Building2 } from "lucide-react";
import { Store } from "@/pages/StoresPage";
import { UseFormReturn } from "react-hook-form";
import { Plus, Minus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
interface StoreFormProps {
  onSubmit: (data: Store) => void;
  editingStore: Store | null;
  form: UseFormReturn<Store>;
  handleCancel: () => void;
  title?: string;
  description?: string;
}

interface StoreHours {
  day: string;
  open: string;
  close: string;
  breakStart: string;
  breakEnd: string;
  isWorkingDay: boolean;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const StoreForm = ({ onSubmit, editingStore, form, handleCancel, title, description }: StoreFormProps) => {
  const { t } = useLanguage();
  const defaultHours: StoreHours[] = DAYS.map(day => ({
    day,
    open: '09:00',
    close: '18:00',
    breakStart: '13:00',
    breakEnd: '14:00',
    isWorkingDay: true
  }));

  useEffect(() => {
    if (editingStore) {
      form.setValue('hours', editingStore?.hours || defaultHours);
    }else {
      form.setValue('hours', defaultHours);
    }
  }, [editingStore, form]);

  return (
    <Card className="overflow-hidden lg:col-span-3 border-2 border-gray-100">
      <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"/>
      {/* <CardHeader>
        <CardTitle className="flex items-center text-bloom-green">
          <Building2 className="h-5 w-5 mr-2 text-bloom-pink" />
          {title || (editingStore ? 'Edit Store' : 'Add Store')}
        </CardTitle>
        <CardDescription>
          {description || (editingStore ? 'Update store details' : 'Add a new store to the network')}
        </CardDescription>
      </CardHeader> */}
      <CardContent className="pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('store.form.name')}</FormLabel>
                    <FormControl>
                      <Input placeholder="Bloom Express Downtown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('store.form.address')}</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('store.form.city')}</FormLabel>
                    <FormControl>
                      <Input placeholder="Seattle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('store.form.phone')}</FormLabel>
                    <FormControl>
                      <Input placeholder="(206) 555-0123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-bloom-green">{t('store.form.hours')}</h3>
                <div className="text-sm text-gray-500">{t('store.form.hoursDesc')}</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 space-y-6">
                {DAYS.map((day, index) => (
                  <div key={day} className="flex border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                    <div className="mr-16 flex items-center gap-4 mb-4 w-20">
                      <FormField
                        control={form.control}
                        name={`hours.${index}.isWorkingDay`}
                        defaultValue={defaultHours[index].isWorkingDay}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <span className="font-medium text-bloom-green">{t(`days.${day}`)}</span>
                      <FormField
                        control={form.control}
                        name={`hours.${index}.day`}
                        defaultValue={day}
                        render={({ field }) => (
                          <FormItem className="hidden">
                            <FormControl>
                              <Input 
                                {...field}
                                className="w-32 font-medium text-bloom-green"
                                readOnly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name={`hours.${index}.open`}
                          defaultValue={defaultHours[index].open}
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel className="text-sm text-gray-600">{t('store.form.open')}</FormLabel> */}
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type="time" 
                                    {...field}
                                    className="pl-8 bg-white"
                                  />
                                  <div className="absolute left-2 top-1/2 -translate-y-1/2">
                                    🌅
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name={`hours.${index}.close`}
                          defaultValue={defaultHours[index].close}
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel className="text-sm text-gray-600">{t('store.form.close')}</FormLabel> */}
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type="time" 
                                    {...field}
                                    className="pl-8 bg-white"
                                  />
                                  <div className="absolute left-2 top-1/2 -translate-y-1/2">
                                    🌙
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name={`hours.${index}.breakStart`}
                          defaultValue={defaultHours[index].breakStart}
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel className="text-sm text-gray-600">{t('store.form.breakStart')}</FormLabel> */}
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type="time" 
                                    {...field}
                                    className="pl-8 bg-white"
                                  />
                                  <div className="absolute left-2 top-1/2 -translate-y-1/2">
                                    ☕
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name={`hours.${index}.breakEnd`}
                          defaultValue={defaultHours[index].breakEnd}
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel className="text-sm text-gray-600">{t('store.form.breakEnd')}</FormLabel> */}
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type="time" 
                                    {...field}
                                    className="pl-8 bg-white"
                                  />
                                  <div className="absolute left-2 top-1/2 -translate-y-1/2">
                                    🔄
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
              >
                {t('store.form.cancel')}
              </Button>
              <Button 
                type="submit" 
                className="bg-bloom-green hover:bg-bloom-green/90"
              >
                {editingStore ? t('store.form.update') : t('store.form.add')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}