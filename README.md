# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

## Associate
- belongs_to :group
- belongs_to :user

## usersテーブル
|column|Type|Optinons|
|------|----|--------|
|neme|string|--------|
|email|string|null: false|
### Asaociation
- has_many :groups,through: :groups_users
- has_many :messages
- has_many :groups_users

## groupsテーブル
|column|Type|Optinons|
|------|----|--------|
|neme|string|null: false|
### Association
- has_many :users,through: :groups_users
- has_many :messages
- has_many :groups_users

## groups_userテーブル
|column|Type|Optinons|
|------|----|--------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
