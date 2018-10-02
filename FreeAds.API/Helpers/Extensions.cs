using System;
using Microsoft.AspNetCore.Http;

namespace FreeAds.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = (DateTime.Today - theDateTime).Days;

            return age;
        }

        public static bool CalculateValidTo(this DateTime theDateTime)
        {
            var age = (DateTime.Today - theDateTime).Days;

            if(age > 30)
                return false;

            return true;
        }
    }
}