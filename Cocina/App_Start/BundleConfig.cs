using System.Web;
using System.Web.Optimization;

namespace Cocina
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css-plugins").Include(
                      "~/Content/css/toastr/toastr.min.css",
                      "~/Content/css/fontawesome/css/all.css",
                      "~/Content/css/datatables/datatables.css",
                      "~/Content/css/flatpickr/flatpickr.min.css",
                      "~/Content/css/open-iconic/css/open-iconic-bootstrap.min.css"));

            bundles.Add(new StyleBundle("~/Content/css-main").Include(
                      "~/Content/css/stylesheets/theme.min.css",
                      "~/Content/css/stylesheets/custom.css"));

            bundles.Add(new StyleBundle("~/Content/js-bases").Include(
                      "~/Content/js/jquery/jquery.core/jquery-3.4.1.js",
                      "~/Content/js/bootstrap/bootstrap.js",
                      "~/Content/js/bootstrap/popper.min.js"));

            bundles.Add(new StyleBundle("~/Content/js-plugins").Include(
                      "~/Content/js/pace/pace.min.js",
                      "~/Content/js/stacked-menu/stacked-menu.min.js",
                      "~/Content/js/perfect-scrollbar/perfect-scrollbar.min.js"));

            bundles.Add(new StyleBundle("~/Content/js-plugins-extra").Include(
                      "~/Content/js/datatables/datatables.js",
                      "~/Content/js/flatpickr/flatpickr.min.js",
                      "~/Content/js/jquery/jquery.validation/jquery.validate.js"));

            bundles.Add(new StyleBundle("~/Content/js-main").Include(
                      "~/Content/js/theme.min.js"));
        }
    }
}
