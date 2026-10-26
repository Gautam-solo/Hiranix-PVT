import { redirect } from "next/navigation";

/**
 * The brands now live in the Home page's "Our brands" section. Old links and
 * bookmarks to /brand land there instead of on a retired page.
 */
export default function BrandPage() {
  redirect("/#brands");
}
