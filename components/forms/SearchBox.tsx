"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SearchBox = ({type} : {type: string}) => {
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: { search: string }) => {
    const params = new URLSearchParams({
      search: values.search,
      pageNumber: "1",
      pageSize: "25",
    });
    if(type === "user" ) router.push("/search?" + params.toString());
    else if (type === "community") router.push("/communities?" + params.toString());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 w-full">
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="username or name"
                  className="no-focus text-light-1 bg-slate-900"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="ml-5 border border-rounded border-none bg-primary-500"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBox;
