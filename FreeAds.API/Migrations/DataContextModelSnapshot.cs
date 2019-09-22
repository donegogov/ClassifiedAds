﻿// <auto-generated />
using System;
using FreeAds.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FreeAds.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("FreeAds.API.Models.ClassifiedAds", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<string>("City");

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<string>("Email");

                    b.Property<string>("Phone");

                    b.Property<string>("Title");

                    b.Property<int>("UserId");

                    b.Property<DateTime>("ValidTo");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ClassifiedAds");
                });

            modelBuilder.Entity("FreeAds.API.Models.Constants.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CategoryName")
                        .IsRequired();

                    b.Property<string>("CategoryValue")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("FreeAds.API.Models.Constants.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CityName")
                        .IsRequired();

                    b.Property<string>("CityValue")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("FreeAds.API.Models.Like", b =>
                {
                    b.Property<int>("LikerUserId");

                    b.Property<int>("LikedClassifiedAdsId");

                    b.HasKey("LikerUserId", "LikedClassifiedAdsId");

                    b.HasIndex("LikedClassifiedAdsId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("FreeAds.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClassifiedAdsId");

                    b.Property<DateTime>("DateAdded");

                    b.Property<bool>("IsMain");

                    b.Property<string>("PublicId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("ClassifiedAdsId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("FreeAds.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("UserRole");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FreeAds.API.Models.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("FreeAds.API.Models.ClassifiedAds", b =>
                {
                    b.HasOne("FreeAds.API.Models.User", "User")
                        .WithMany("ClassifiedAds")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FreeAds.API.Models.Like", b =>
                {
                    b.HasOne("FreeAds.API.Models.ClassifiedAds", "LikedClassifiedAds")
                        .WithMany("LikersUsers")
                        .HasForeignKey("LikedClassifiedAdsId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("FreeAds.API.Models.User", "LikerUser")
                        .WithMany("LikedClassifiedAds")
                        .HasForeignKey("LikerUserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("FreeAds.API.Models.Photo", b =>
                {
                    b.HasOne("FreeAds.API.Models.ClassifiedAds", "ClassifiedAds")
                        .WithMany("Photos")
                        .HasForeignKey("ClassifiedAdsId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
