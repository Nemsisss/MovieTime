import {render, screen, fireEvent} from "@testing-library/react"
import LoginForm, {validateInput} from "./pages/LoginForm"

describe("login", () => {
test("validate function to pass correct input", () => {
 const text = "test@test.com";
 expect(validateInput(text)).toBe(true);
 });

test("validate function to fail incorrect input", () => {
 const text = "test";
 expect(validateInput(text)).not.toBe(true);
 });

test("validate function to fail incorrect input by blank string", () => {
 const text = "";
 expect(validateInput(text)).not.toBe(true);
 });

test("log in form should be in the document", () => {
 const component = render(<LoginForm />);
 const inputNode = component.getByText("Email:");
 expect(inputNode).toBeInTheDocument();
 });


test("email field should have label", () => {
 const component = render(<LoginForm />);
 const emailInput = component.getByLabelText("Email:");
 expect(emailInput.getAttribute("name")).toBe("email");
 });


test("email input should accept text", () => {
 const {getByLabelText} = render(<LoginForm />);
 const emailInput = getByLabelText("Email:");
 expect(emailInput.value).toMatch("");
 fireEvent.change(emailInput, {target: {value: "testing" } });
 expect(emailInput.value).toMatch("testing");
 });


test("email input should accept text", () => {
 const {getByLabelText} = render(<LoginForm />);
 const emailInput = getByLabelText("Email:");
 const errorMsg = "Email not valid";

 expect(emailInput.value).toMatch("");
 fireEvent.change(emailInput, {target: {value: "test@test.com" } });
 expect(emailInput.value).toMatch("test@test.com");

 expect(validateInput(errorMsg)).not.toBe(true);

 });

test ("should be able to submit form", () => {
const mockFn = jest.fn();
const {getByRole} = render(<LoginForm handleSubmit = {mockFn} />);
const buttonNode = getByRole("button");
fireEvent.submit(buttonNode);
expect(mockFn).toHaveBeenCalledTimes(0);
});

test ("test for password input", () => {
const {getByLabelText } = render(<LoginForm/>);
const passWordInput = getByLabelText("Password:");
expect(passWordInput.value).toMatch("")
fireEvent.change(passWordInput, {target: {value: "1234" }});
expect(passWordInput.value).toMatch("1234");
});


test("validate input test", () => {
 const text = '';
 expect(validateInput(text)).toBe(false);
 });

 });