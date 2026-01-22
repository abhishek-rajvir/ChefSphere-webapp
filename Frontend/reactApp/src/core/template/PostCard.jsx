import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { PasswordInput } from "../../core/template/PasswordInput";

import axios from "axios";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

export default function PostCard({ limit }) {
  const [users, setUsers] = useState([]);

  const getData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-8 flex center">
      {users.slice(0, limit).map((u, indx) => (
        <Card key={indx} className="overflow-hidden rounded-md p-0 gap-0">
          <div className="overflow-hidden">
            <img
              src={
                "https://dummyjson.com/image/300x300/282828?fontFamily=pacifico&text=I+am+a+demo+image"
              }
              alt="Failed img"
              className="w-full h-full object-cover block"
            />
          </div>

          <CardContent className="space-y-2">
            <p className="font-semibold">{u.company.catchPhrase}</p>
            <p className="text-sm">Category: xyz</p>
            <p className="text-sm">
              Duration: {new Date().toLocaleTimeString()}
            </p>
            <p className="text-sm break-all">{u.email}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
{
  /* <Card>
      <CardHeader>
        <CardTitle>
          <p>
            Login&nbsp; <ModeToggle />
          </p>
        </CardTitle>
        <CardDescription>Enter your email below</CardDescription>
        {/* <CardAction>
          <Button variant="link">Register</Button>
        </CardAction> 
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="abc@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> 
              </div>
              <PasswordInput />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card> */
}
{
  /* ); */
}
{
  /* } */
}
